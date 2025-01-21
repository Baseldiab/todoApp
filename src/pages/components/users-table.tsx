import React from "react";
// lib imports
import { ColumnDef } from "@tanstack/react-table";

// asset imports
import { PencilIcon, PlusIcon } from "lucide-react";
import { Trash2 } from "lucide-react";

// types
import { User } from "@/api/types/user";

// Ui imports
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

// components dialogs
import ConfirmDeleteDialog from "@/components/dialogs/confirmDeleteDialog";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/routes/user";
import Loading from "@/components/common/loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function UsersTable() {
  // state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Queries
  const { data: allUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  // Calculate pagination
  const paginatedUsers = React.useMemo(() => {
    if (!allUsers) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allUsers.slice(startIndex, endIndex);
  }, [allUsers, currentPage]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "_id",
      header: () => <p className="text-start ">#</p>,
      cell: ({ row }) => {
        return <div className="text-start font-medium ">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: () => <p className="text-start">Name</p>,
      cell: ({ row }) => {
        return (
          <div className="text-start font-medium ">{row.original.name}</div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => <p className="text-start">Email</p>,
      cell: ({ row }) => {
        return <p className="text-start font-medium ">{row.original.email}</p>;
      },
    },
    {
      accessorKey: "phone",
      header: () => <p className="text-start">Phone</p>,
      cell: ({ row }) => {
        return <p className="text-start font-medium ">{row.original.phone}</p>;
      },
    },
    {
      accessorKey: "address",
      header: () => <p className="text-start">Address</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">{row.original.address.city}</p>
        );
      },
    },

    {
      accessorKey: "options",
      header: () => <div className="text-start">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <Button
              title="Edit"
              onClick={() => {
                console.log(row.original);
              }}
              className="flex items-center font-medium select-none gap-2 h-[44px] w-fit border border-theme-separator bg-transparent text-yellow-500 hover:bg-yellow-500 hover:text-white"
            >
              <PencilIcon className="size-5 -mb-1 min-w-4 min-h-4" />
            </Button>
            <Button
              title="Delete"
              onClick={() => {
                console.log(row.original);
              }}
              className="flex items-center font-medium select-none gap-2 h-[44px] w-fit border bg-transparent hover:bg-red-500 hover:text-white text-red-500"
            >
              <Trash2 className="size-4 -mb-1 min-w-4 min-h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isUsersLoading || !allUsers) {
    return <Loading />;
  }

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

  return (
    <div className="w-full bg-transparent rounded-3xl p-6 flex flex-col gap-6 container">
      <div className="flex items-center gap-6 w-full justify-between">
        <h1 className="font-bold font-sans -mt-2 text-2xl">All Users</h1>
        <Button
          onClick={() => {
            console.log("add");
          }}
          className="flex items-center font-medium select-none gap-2 h-[44px] w-[170px] bg-blue-500 hover:bg-blue-600 dark:bg-white dark:hover:bg-white/50"
        >
          <PlusIcon className="size-4 -mb-1 min-w-4 min-h-4" />
          Add New User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={paginatedUsers}
        headerClasses="!bg-blue-500 dark:!bg-white/50 *:hover:!bg-theme-main-primary  !border-none rounded-xl"
        headerCellClasses="!text-white !font-semibold"
        className="border-2 border-theme-lunar-light border-none shadow-xl rounded-xl"
        rowClasses="dark:!bg-white/5"
      />

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <ConfirmDeleteDialog
          handleDelete={() => {}}
          onCloseModal={() => {}}
          isLoading={false}
          title={"Are you sure you want to delete this user?"}
          description={"This action cannot be undone."}
        />
      </Dialog>
    </div>
  );
}

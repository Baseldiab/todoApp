import { Helmet } from 'react-helmet-async';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Helmet>
        <title>Modern React App</title>
        <meta name="description" content="A modern React application with TypeScript, Tailwind CSS, and more" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 pt-20">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Your Modern React App
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            This template includes React, TypeScript, Tailwind CSS, shadcn/ui, Zod,
            React Hook Form, Framer Motion, dark/light theme support, Zustand,
            React Query, and Axios.
          </p>
        </main>
      </div>
    </>
  );
}

export default App;
import { Link, useNavigate } from 'react-router-dom';
import { CircleUser, FileUser, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/UserContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const { user, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    const loadBack = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/cv`);
        if (!response.ok) {
          throw new Error('Failed to cv');
        }
      } catch (error) {
        toast.error('Backend not loaded:', error);
      }
      setLoading(false);
    };
    loadBack();
  }, []);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-white">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <FileUser className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          to="/allcvs"
          className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
        >
          All CV&apos;s
        </Link>
        {user && (
          <Link
            to="/mycv"
            className="text-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            My CV
          </Link>
        )}
        {loading && <span>The backend is starting up...</span>}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <FileUser className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to="/allcvs"
              className="text-muted-foreground hover:text-foreground whitespace-nowrap"
            >
              All CV&apos;s
            </Link>
            {user && (
              <Link
                to="/mycv"
                className="hover:text-foreground whitespace-nowrap"
              >
                My CV
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/mycv" className="whitespace-nowrap">
                <DropdownMenuItem>My CV</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {user ? (
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <Link to="/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;

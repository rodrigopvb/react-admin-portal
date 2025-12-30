import { useAuth } from '@/providers/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 px-6">
          <h1 className="text-xl font-bold tracking-tight">User Management</h1>
        </div>

        <div className="flex items-center gap-4 px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 flex items-center gap-3 px-2 hover:bg-accent rounded-lg transition-colors">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.email} />
                  <AvatarFallback className="bg-primary/10 text-primary uppercase">
                    {user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start text-sm">
                  <span className="font-medium truncate max-w-[150px]">{user?.email}</span>
                  <span className="text-xs text-muted-foreground leading-none capitalize">{user?.role?.toLowerCase()}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground uppercase tracking-wider mt-1">
                    {user?.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}


import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, 
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, 
  SidebarTrigger } from "@/components/ui/sidebar";
import { Home, User, Stethoscope, Activity, BarChart, HelpCircle, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserProfile } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  userProfile?: UserProfile;
}

const DashboardLayout = ({ children, activeTab = "dashboard", userProfile }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  
  const menuItems = [
    { title: "Dashboard", icon: Home, href: "/", id: "dashboard" },
    { title: "My Doctors", icon: Stethoscope, href: "/doctors", id: "doctors" },
    { title: "My Program", icon: Activity, href: "/program", id: "program" },
    { title: "My Progress", icon: BarChart, href: "/progress", id: "progress" },
    { title: "My Profile", icon: User, href: "/profile", id: "profile" },
    { title: "Help & Support", icon: HelpCircle, href: "/help", id: "help" },
  ];

  const logoSection = (
    <div className="flex items-center gap-3 p-4">
      <div className="bg-hopelink-primary rounded-full p-2 flex items-center justify-center">
        <Heart size={24} className="text-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg">HopeLink</span>
        <span className="text-xs text-muted-foreground">Patient Zone</span>
      </div>
    </div>
  );

  const userSection = userProfile && (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <Avatar className="h-10 w-10 border-2 border-hopelink-accent">
          <AvatarImage src={userProfile?.imageUrl} alt={userProfile?.name} />
          <AvatarFallback className="bg-hopelink-primary text-white">
            {userProfile?.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{userProfile?.name}</span>
          <span className="text-xs text-muted-foreground">Patient</span>
        </div>
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader>
            {logoSection}
            {userSection && (
              <>
                <Separator />
                {userSection}
              </>
            )}
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild
                        className={activeTab === item.id ? 
                          "bg-muted hover:bg-muted text-foreground" : undefined}
                      >
                        <a href={item.href} className="flex items-center gap-3">
                          <item.icon size={isMobile ? 20 : 18} />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <SidebarTrigger className="lg:hidden" />
            </div>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

import { Sidebar, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";

export function AppSidebar() {
    return (
        <Sidebar variant="sidebar">
            <SidebarHeader  >
                <h1>
                    Menu
                </h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuButton>
                            exemplo
                        </SidebarMenuButton> 
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
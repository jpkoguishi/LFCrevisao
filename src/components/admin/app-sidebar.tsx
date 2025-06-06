"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  GalleryVerticalEnd,
  LayoutPanelTop,
  FileText,
  Users,
  PackageOpen
} from "lucide-react"

import { supabase } from "@/lib/supabase"
import { NavMain } from "@/components/admin/nav-main"
import { NavProjects } from "@/components/admin/nav-projects"
import { NavUser } from "@/components/admin/nav-user"
import { TeamSwitcher } from "@/components/admin/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "LFC",
      logo: GalleryVerticalEnd,
      plan: "Revisão",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutPanelTop,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/admin",
        },
        
      ],
    },
    {
      title: "Atividades",
      url: "#",
      icon: FileText,
      isActive: true,
      items: [
        {
          title: "Todas as Atividades",
          url: "/admin/atividades",
        },
        {
          title: "Criar atividade",
          url: "/admin/atividades/criar",
        },
        {
          title: "Arquivados",
          url: "/admin/atividades/arquivados",
        },
      ],
    },
    {
      title: "Colaboradores",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Todos os Colaboradores",
          url: "/admin/colaboradores",
        },
        {
          title: "Cadastrar Colaborador",
          url: "/admin/colaboradores/criar",
        },
      ],
    },
    {
      title: "Sobre",
      url: "#",
      icon: PackageOpen,
      isActive: true,
      items: [
        {
          title: "Novidades",
          url: "https://github.com/jpkoguishi/LFCrevisao/releases",
          newTab: true,
        },
      ],
    },
    
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<{
    name: string
    email: string
  }>({
    name: "Loading...",
    email: "Loading...",
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user_id")
      if (!userId) return

      const { data, error } = await supabase
        .from("users")
        .select("name, email")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Erro ao buscar dados do usuário:", error.message)
      } else if (data) {
        setUser({
          name: data.name,
          email: data.email,
        })
      }
    }

    fetchUserData()
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

"use client"

import { Agency, User } from "@prisma/client"
import { ReactNode } from "react"

interface ModalProviderProps {
  children: ReactNode
}

export type ModalData = {
  user?: User
  agency?: Agency
}

type ModalContextType = {
  data: ModalData 
  isOpen: boolean 
  setOpen: (modal: ReactNode, fetchData?: () => Promise<any>) => void
  setClose: () => void
}
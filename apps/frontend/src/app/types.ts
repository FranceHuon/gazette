export interface LayoutProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export interface PageProps {
  params: { slug?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

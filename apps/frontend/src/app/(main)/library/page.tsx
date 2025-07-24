'use client'

import { Flex } from '@chakra-ui/react'
import LibraryCard from '@/components/custom/LibraryCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useContents } from '@/hooks/useContents'
import { useLikes } from '@/hooks/useLikes'

function LibraryPageContent() {
  const { contents } = useContents()
  const { like, dislike, isLiked } = useLikes()

  const handleLike = (contentId: string) => {
    like(contentId)
  }

  const handleDislike = (contentId: string) => {
    dislike(contentId)
  }

  const likedContents = contents?.filter(content => isLiked(content.id)) || []

  return (
    <ResponsiveLayout>
      <Flex flexDirection="column" gap={1}>
        {likedContents.map(content => (
          <Flex key={content.id} direction="column" gap={4}>
            <LibraryCard content={content} like={handleLike} dislike={handleDislike} isLiked={isLiked} />
          </Flex>
        ))}
      </Flex>
    </ResponsiveLayout>
  )
}

export default function LibraryPage() {
  return (
    <AuthGuard>
      <LibraryPageContent />
    </AuthGuard>
  )
}

'use client'

import { Flex } from '@chakra-ui/react'
import LibraryCard from '@/components/custom/LibraryCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useContents } from '@/hooks/useContents'
import { useLikes } from '@/hooks/useLikes'

function LibraryPageContent() {
  const { contents } = useContents()
  const { dislike, isLiked } = useLikes()

  const handleDislike = (contentId: string) => {
    dislike(contentId)
  }

  const likedContents = contents?.filter(content => isLiked(content.id)) || []

  return (
    <ResponsiveLayout>
      <Flex flexDirection="column" gap={{ base: 12, md: 4 }} flexGrow={1} height="100%">
        {likedContents.map((content, index) => (
          <Flex key={content.id} direction="column" gap={4}>
            <LibraryCard content={content} dislike={handleDislike} isFirst={index === 0} isLast={index === likedContents.length - 1} />
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

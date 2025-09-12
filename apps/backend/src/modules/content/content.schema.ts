import CollectionCreateSchema from 'typesense'

export const CONTENTS_SCHEMA: CollectionCreateSchema = {
  name: 'contents',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'link', type: 'string' },
    { name: 'date', type: 'int64' },
    { name: 'mediaId', type: 'string', facet: true },
  ],
  default_sorting_field: 'date',
}

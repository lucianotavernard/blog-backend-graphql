import graphQLFields from 'graphql-fields'

export function compose(...fcns) {
  if (fcns.length === 0) return o => o
  if (fcns.length === 1) return fcns[0]

  return resolve =>
    fcns.reduceRight((fnPrevious, fn) => fn(fnPrevious), resolve)
}

export function authenticated(resolve) {
  return (parent, args, ctx, info) => {
    if (!ctx.user) throw Error('Access not allowed')

    return resolve(parent, args, ctx, info)
  }
}

export function getFields(info, includes = [], excludes = []) {
  const fields = graphQLFields(info)

  return Object.keys(fields)
    .map(field =>
      Object.keys(fields[field]).length > 0 ? `${field}_id` : field
    )
    .concat(includes)
    .filter(field => ![...excludes, 'comments_id'].includes(field))
}

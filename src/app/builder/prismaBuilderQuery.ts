export const buildPrismaQuery = <TWhereInput, TOrderByInput>({
  searchFields = [],
  searchQuery = '',
  filter = {} as TWhereInput,
  orderBy = {} as TOrderByInput,
  page = 1,
  pageSize = 10,
  left,
}: {
  searchFields?: string[];
  searchQuery?: string;
  filter?: TWhereInput;
  orderBy: TOrderByInput;
  page: number;
  pageSize: number;
  left?: string;
}) => {
  const skip = left ? Number(left) : (page - 1) * pageSize;
  const take = pageSize;

  const searchConditions =
    searchFields.length > 0 && searchQuery
      ? {
        OR: searchFields.map((field) => ({
          [field]: {
            contains: searchQuery,
          },
        })),
      }
      : {};

  const where = {
    ...filter,
    ...(Object.keys(searchConditions).length > 0 && searchConditions),
  };  

  const query = {
    skip,
    take: Number(take),
    where,
    orderBy,
  };

  return query;
};

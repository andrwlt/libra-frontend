import Loading from 'components/Common/Loading';

const TableLoader = ({ children }: any) => {
  return (
    <tbody className="relative-container ant-table-tbody">
      {children}
      <Loading loading={true} />
    </tbody>
  );
};

const getTableLoaderProps = (isLoading: any) => {
  const tableProps = isLoading
    ? {
        components: {
          body: {
            wrapper: ({ children }: any) => {
              return <TableLoader children={children} />;
            },
          },
        },
      }
    : {};

  return tableProps;
};

export default getTableLoaderProps;

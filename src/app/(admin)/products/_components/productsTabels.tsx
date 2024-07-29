"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button, IconButton, Tooltip } from "@mui/material";
import DialogComponent, { DialogContext } from "@/components/admin/dialog";
import { NotificationContext } from "@/components/admin/notification";
import { set } from "date-fns";
import { ProductsTableData } from "@/types/products";
import { CldImage } from "next-cloudinary";

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  n: keyof ProductsTableData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    n: "thumbnail",
    numeric: false,
    disablePadding: true,
    label: "THUMBNAIL",
  },
  {
    n: "name",
    numeric: false,
    disablePadding: true,
    label: "NAME",
  },
  {
    n: "quntity",
    numeric: true,
    disablePadding: false,
    label: "QUNTITY",
  },
  {
    n: "buyers",
    numeric: true,
    disablePadding: false,
    label: "BUYERS",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof UsersTableData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof UsersTableData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.n}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.n ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.n}
              direction={orderBy === headCell.n ? order : "asc"}
              onClick={createSortHandler(headCell.n)}
            >
              <Typography
                className="text-gray"
                fontWeight={"fontWeightBold"}
                fontSize=""
              >
                {headCell.label}
                {orderBy === headCell.n ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ProductsTable({
  initilaData,
  count,
}: {
  initilaData: ProductsTableData[];
  count: number;
}) {
  const searchParams = useSearchParams();
  const {
    s,
    itemsPerPage,
    page: pageParams,
    orderBy: orderByParams,
    order: orderParams,
  } = Object.fromEntries(searchParams.entries());
  const order: Order = orderParams == "asc" ? "asc" : "desc";
  const orderBy: keyof ProductsTableData = [
    "name",
    "quntity",
    "buyers",
    "date",
  ].includes(orderByParams)
    ? (orderByParams as keyof ProductsTableData)
    : "date";

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const page = Number(pageParams) || 1;
  const rowsPerPage = Number(itemsPerPage) || 5;
  const [rows, setRows] = React.useState(initilaData);
  const router = useRouter();
  const notification = React.useContext(NotificationContext);
  const dialog = React.useContext(DialogContext);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProductsTableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const newParams = {
      orderBy: property,
      order: isAsc ? "desc" : "asc",
    };
    router.replace(`/products?${updateQueryString(newParams)}`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((e) => e.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleDeleteClick = async () => {
    dialog.open({
      title: "Delete",
      text: "Are you sure do you want to remove Users?",
      onOk: async () => {
        notification.open({
          severityParams: "info",
          variantParams: "outlined",
          textParams: "Deleting User",
        });
        const res = await fetch("/api/products", {
          method: "DELETE",
          body: JSON.stringify({
            ids: selected,
          }),
          cache: "no-store",
        });
        if (res.ok) {
          notification.open({
            severityParams: "success",
            variantParams: "filled",
            textParams: "User deleted successfully",
          });
          setRows((prev) => prev.filter((e) => !selected.includes(e.id)));
          setSelected([]);
        } else {
          notification.open({
            severityParams: "error",
            variantParams: "filled",
            textParams: "User deleted failed",
          });
        }
      },
    });
  };
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    const newParams = {
      page: (newPage + 1).toString(),
    };
    router.replace(`/products?${updateQueryString(newParams)}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParams = {
      itemsPerPage: parseInt(event.target.value, 10).toString(),
    };
    router.replace(`/products?${updateQueryString(newParams)}`);
  };
  const updateQueryString = (params: object) => {
    const search = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(params)) {
      search.set(key, value);
    }

    return search.toString();
  };
  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }),
            }}
          >
            {selected.length > 0 ? (
              <Tooltip onClick={handleDeleteClick} title="Delete">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <Button
                onClick={() => router.push("/products/product")}
                variant="contained"
                color="primary"
              >
                New Product
              </Button>
            </Tooltip>
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className="text-gray"
                      >
                        <CldImage
                          src={row.thumbnail}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className="text-gray"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell className="text-darkBlue" align="right">
                        {row.quntity}
                      </TableCell>
                      <TableCell className="text-gray" align="right">
                        {row.buyers}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </Box>
    </>
  );
}

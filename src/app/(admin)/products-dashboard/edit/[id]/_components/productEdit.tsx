"use client";
import {
  Autocomplete,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "react-query";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NotificationContext } from "@/components/admin/notification";
import { Prisma } from "@prisma/client";
const productInclude = {
  productCategories: {
    include: {
      category: true,
    },
  },
  variants: {
    include: {
      color: true,
      size: true,
      pictures: {
        include: {
          picture: true,
        },
      },
    },
  },
  thumbnail: true,
};
export default function ProductEdit({
  product,
}: {
  product: Prisma.ProductGetPayload<{
    include: typeof productInclude;
  }>;
}) {
  const [time, setTime] = React.useState<NodeJS.Timeout>();
  const [open, setOpen] = React.useState(false);
  // auto complete
  const [categorys, setCategorys] = React.useState<string[]>([]);

  // inputs
  const [thumbnail, setThumbnail] = React.useState<string>(
    product.thumbnail.url
  );
  const [category, setCategory] = React.useState<string>(
    product.productCategories[0].category.name
  );
  const [name, setName] = React.useState<string>(product.name);
  const [description, setDescription] = React.useState<string>(
    product.description
  );
  const [variants, setVariants] = React.useState<
    {
      size: string;
      color: string;
      price: number;
      quantity: number;
      images: string[];
    }[]
  >(
    product.variants.map((variant) => ({
      color: variant.color.name,
      size: variant.size.name,
      price: variant.price,
      quantity: variant.quantity,
      images: variant.pictures.map((picture) => picture.picture.url),
    }))
  );
  // temp variant
  const [index, setIndex] = useState<number>();
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [quantity, setQuntity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [action, setAction] = useState<"newVariant" | "editVariant">(
    "newVariant"
  );
  const notification = useContext(NotificationContext);

  // fetch category
  const { isLoading, mutate: fetchCategory } = useMutation({
    mutationFn: async (name: string) =>
      await fetch("/api/products/categories?name=" + name).then((res) =>
        res.json()
      ),
    onSuccess: (data) => setCategorys(data),
  });
  // functions
  const handleClickAddVariant = () => {
    setOpen(true);
    if (action == "editVariant") {
      setSize("");
      setColor("#000000");
      setQuntity(0);
      setPrice(0);
      setImages([]);
      setAction("newVariant");
    }
  };
  const handleSave = () => {
    if (
      size === "" ||
      color === "" ||
      quantity === 0 ||
      price === 0 ||
      images.length === 0
    ) {
      notification.open({
        severityParams: "error",
        variantParams: "filled",
        textParams: "Please fill all fields",
      });
      return;
    }
    if (action == "newVariant") {
      setOpen(false);
      setVariants([
        ...variants,
        {
          color,
          size,
          price,
          quantity,
          images,
        },
      ]);
      setSize("");
      setColor("#000000");
      setQuntity(0);
      setPrice(0);
      setImages([]);
    } else {
      setOpen(false);
      setVariants((prev) => {
        prev[index!] = {
          color,
          size,
          price,
          quantity,
          images,
        };
        return prev;
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClear = () => {
    if (action == "newVariant") {
      setSize("");
      setColor("#000000");
      setQuntity(0);
      setPrice(0);
      deleteImgs(images);
      setImages([]);
    } else {
      setSize(variants[index!].size);
      setColor(variants[index!].color);
      setQuntity(variants[index!].quantity);
      setPrice(variants[index!].price);
      setImages(variants[index!].images);
    }
  };
  const handleClearProduct = () => {
    setName(product.name);
    setDescription(product.description);
    setThumbnail(product.thumbnail.url);
    setCategory(product.productCategories[0].category.name);
    setVariants(
      product.variants.map((variant) => ({
        color: variant.color.name,
        size: variant.size.name,
        price: variant.price,
        quantity: variant.quantity,
        images: variant.pictures.map((picture) => picture.picture.url),
      }))
    );
    setSize("");
    setColor("#000000");
    setQuntity(0);
    setPrice(0);
    setImages([]);
  };
  const handleSaveProduct = () => {
    if (
      name === "" ||
      thumbnail === "" ||
      category === "" ||
      variants.length === 0
    ) {
      notification.open({
        severityParams: "error",
        variantParams: "filled",
        textParams: "Please fill all fields",
      });
      return;
    }
    notification.open({
      severityParams: "info",
      variantParams: "outlined",
      textParams: "Wait",
    });
    fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify({
        id: product.id,
        name,
        description,
        thumbnail,
        category,
        variants,
      }),
    })
      .then((res) => {
        if (res.ok) {
          notification.open({
            severityParams: "success",
            variantParams: "filled",
            textParams: "Product saved",
          });
          handleClearProduct();
        } else {
          console.error(res);
          notification.open({
            severityParams: "error",
            variantParams: "filled",
            textParams: "Error",
          });
        }
      })
      .catch((e) => {
        console.error(e);
        notification.open({
          severityParams: "error",
          variantParams: "filled",
          textParams: "Error",
        });
      });
  };
  const deleteImgs = async (imagesDeleted: string[]) => {
    await fetch("/api/cloudinary", {
      method: "DELETE",
      body: JSON.stringify({
        ids: imagesDeleted,
      }),
    });
  };
  return (
    <>
      <Stack bgcolor={"white"} paddingX={"10px"} paddingY={"50px"}>
        <Stack paddingX={"40px"} rowGap={"10px"}>
          <Stack
            direction="row"
            justifyContent={"end"}
            gap={{
              xs: "2px",
              md: "4px",
            }}
          >
            <Button
              onClick={handleClearProduct}
              variant="contained"
              color="error"
            >
              Clear
            </Button>
            <Button
              onClick={handleSaveProduct}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Stack>
          <Typography variant="body1">Genral</Typography>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent={"space-between"}
            gap={{
              xs: 2,
              md: 4,
            }}
          >
            <TextField
              type="text"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <Autocomplete
              fullWidth
              freeSolo
              value={category}
              options={categorys}
              loading={isLoading}
              renderInput={(params) => (
                <TextField
                  onFocus={() => fetchCategory(name)}
                  onChange={(e) => {
                    setCategory(e.currentTarget.value);
                    if (time) {
                      clearTimeout(time);
                    }
                    setTime(
                      setTimeout(() => {
                        fetchCategory(e.target.value);
                      }, 1000)
                    );
                  }}
                  label="Category"
                  {...params}
                />
              )}
            />
          </Stack>
          <TextField
            label="Description"
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
            fullWidth
            multiline
          />
          <div className="flex items-center justify-center w-full">
            {!thumbnail && (
              <CldUploadWidget
                uploadPreset={process.env.CLOUDINARY_UPLOADPRESET}
                options={{
                  multiple: false,
                  folder: process.env.CLOUDINARY_FOLDER,
                  resourceType: "image",
                }}
                onSuccess={async (result) => {
                  await deleteImgs(thumbnail ? [thumbnail] : []);
                  setThumbnail(result.info.public_id || "");
                }}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  </button>
                )}
              </CldUploadWidget>
            )}
            {thumbnail && (
              <CldUploadWidget
                uploadPreset={process.env.CLOUDINARY_UPLOADPRESET}
                options={{
                  multiple: false,
                  folder: process.env.CLOUDINARY_FOLDER,
                  resourceType: "image",
                }}
                onSuccess={async (result) => {
                  await deleteImgs(thumbnail ? [thumbnail] : []);
                  setThumbnail(result.info.public_id || "");
                }}
              >
                {({ open }) => (
                  <CldImage
                    onClick={() => open()}
                    src={thumbnail}
                    alt="product"
                    width={256}
                    height={256}
                    className="object-cover rounded-lg"
                  />
                )}
              </CldUploadWidget>
            )}
          </div>
        </Stack>
        <Stack
          direction={"column"}
          paddingX={"40px"}
          paddingY={"20px"}
          rowGap={"10px"}
        >
          <Typography variant="body1">Variants</Typography>
          <Stack
            direction={"row"}
            paddingX={"40px"}
            paddingY={"20px"}
            columnGap={"10px"}
            alignItems={"center"}
          >
            <button
              onClick={handleClickAddVariant}
              className="flex flex-col items-center justify-center w-fit h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center p-10">
                <svg
                  className="w-8 h-8  text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">ADD</p>
              </div>
            </button>
            {variants.map((variant, i) => (
              <div
                onClick={() => {
                  setSize(variant.size);
                  setColor(variant.color);
                  setQuntity(variant.quantity);
                  setPrice(variant.price);
                  setImages(variant.images);
                  setAction("editVariant");
                  setIndex(i);
                  setOpen(true);
                }}
                key={i}
                className={`bg-[${variant.color}] relative cursor-pointer w-28 h-28 flex justify-center items-center rounded-md`}
              >
                <DeleteOutlineIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteImgs(variant.images);
                    setVariants(variants.filter((e, index) => index !== i));
                  }}
                  className="absolute top-1 right-1 z-30 cursor-pointer"
                  color="error"
                />
                <Typography
                  variant="body1"
                  fontSize={"bold"}
                  color={variant.color == "#000000" ? "white" : "black"}
                >
                  {variant.size}
                </Typography>
              </div>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <Stack direction={"column"} alignItems={"center"} gap={"10px"}>
            <input
              type="color"
              name=""
              id=""
              value={color}
              onChange={(e) => setColor(e.currentTarget.value)}
            />

            <TextField
              label="Size"
              value={size}
              onChange={(e) => setSize(e.currentTarget.value)}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.currentTarget.value))}
              fullWidth
            />
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuntity(Number(e.currentTarget.value))}
              fullWidth
            />
            <Stack
              className="w-full"
              direction={"row"}
              justifyItems={"start"}
              flexWrap={"wrap"}
              gap={{
                xs: "5px",
                lg: "10px",
                xl: "15px",
              }}
            >
              <CldUploadWidget
                uploadPreset={process.env.CLOUDINARY_UPLOADPRESET}
                options={{
                  multiple: true,
                  folder: process.env.CLOUDINARY_FOLDER,
                  resourceType: "image",
                }}
                onSuccess={(result) => {
                  if (action === "newVariant") {
                    setImages((prev) => [
                      ...prev,
                      result.info!.public_id || "",
                    ]);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="flex flex-col self-start items-center justify-center w-fit h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center p-10">
                      <svg
                        className="w-8 h-8  text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ADD
                      </p>
                    </div>
                  </button>
                )}
              </CldUploadWidget>
              {images.map((img, i) => (
                <div key={i} className="flex flex-col w-32 h-32 relative">
                  <DeleteOutlineIcon
                    onClick={() => {
                      setImages(images.filter((e) => e !== img));
                      deleteImgs([img]);
                    }}
                    className="absolute top-1 right-1 z-30 cursor-pointer"
                    color="error"
                  />
                  <CldImage
                    key={i}
                    src={img}
                    alt="product"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear} autoFocus>
            reset
          </Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

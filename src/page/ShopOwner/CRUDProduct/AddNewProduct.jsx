import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { ListTags } from "../../../components/ListTags/ListTags";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { addImage, createNew } from "../../../api";
import { SizesList } from "../../../components/SizeList/SizeList";
import MDEditor from "@uiw/react-md-editor";

const AddNewProduct = () => {
  const [listImage, setListImage] = useState([]);
  const [listImageFileToSend, setListImageFileToSend] = useState([]);
  const [listTags, setListTags] = useState([]);
  const [listSizes, setListSizes] = useState([]);
  const [openSizeList, setOpenSizeList] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState("");

  const userInfo = useSelector(userInfoSelector);

  const confirmData = useConfirm();

  const fieldsetCommonStyle100 = {
    "& label": {
      color: "#ccc",
    },
    "& input": {
      color: "black",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    ".MuiSvgIcon-root": {
      color: "black",
    },
  };

  const boxStyle = {
    my: 2,
  };

  const handleSetImage = (event) => {
    const dataImage = [...listImage];
    const dataImageToSend = [...listImageFileToSend];
    dataImage.push(URL.createObjectURL(event.target?.files[0]));
    dataImageToSend.push(event.target?.files[0]);
    setListImage(dataImage);
    setListImageFileToSend(dataImageToSend);
  };

  const handleDeleteImage = (item) => {
    const dataImage = [...listImage];
    setListImage(dataImage.filter((i) => i !== item));
  };

  const handleSelectTags = (result) => {
    setListTags((preState) => {
      handleSetSize(result);
      return result;
    });
  };
  const handleSelectSize = (result) => {
    setListSizes(result);
  };

  const handleSetSize = (data) => {
    const listSize = [...data];
    let result = listSize.some(
      (item) => item.includes("Thời trang") || item.includes("Quần áo")
    );
    setOpenSizeList(result);
  };

  const handleCreateNewAProduct = (data, image) => {
    toast
      .promise(createNew(data), {
        pending: "Đang gửi thông tin",
      })
      .then((res) => {
        if (!res.error) {
          toast
            .promise(addImage(image, res[0]._id), {
              pending: "Đang gửi thông tin",
            })
            .then((res) => {
              if (!res.error) {
                toast.success("Thành công");
                setListImage([]);
                setListImageFileToSend([]);
                setValue("");
                reset();
              }
            });
        }
      });
  };

  const onSubmit = async (data) => {
    let listImageFormData = [...listImageFileToSend];
    let reqData = new FormData();
    listImageFormData.forEach((i) => reqData.append("imageProduct", i));
    // for (const value of reqData.values()) {
    //   console.log("reqData Value: ", value);
    // }
    const { confirmed, reason } = await confirmData({
      description: "Sau khi gửi sẽ không thay đổi được thông tin",
      title: "Xác nhận thêm mới sản phẩm này",
    });
    if (confirmed) {
      if (value.trim().length === 0) {
        toast.warning("Yêu cầu 1 chút về mô tả sản phẩm");
        return;
      }
      handleCreateNewAProduct(
        {
          ...data,
          tagsId: [...listTags],
          size: listSizes?.length > 0 ? listSizes : [],
          shopId: userInfo.shopId,
          description: value,
        },
        reqData
      );
    }
  };

  return (
    <Container sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ border: "2px solid", padding: "10px" }}
      >
        <Box sx={boxStyle}>
          <TextField
            // defaultValue="test"
            fullWidth
            label="Tên sản phẩm"
            error={errors.name}
            {...register("name", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.name && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.name.message}
            </Alert>
          )}
        </Box>

        {/* <Box sx={boxStyle}>
          <TextField
            // defaultValue="test"
            fullWidth
            multiline
            label="Miêu tả sản phẩm "
            rows={4}
            error={errors.description}
            {...register("description", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.description && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.description.message}
            </Alert>
          )}
        </Box> */}

        {/* description editor */}
        <Box>
          <MDEditor value={value} onChange={setValue} height={"500px"} />
          {/* <MDEditor.Markdown
            source={value}
            style={{ whiteSpace: "pre-wrap" }}
          /> */}
        </Box>

        {/* price */}
        <Box sx={boxStyle}>
          <TextField
            label="Giá cả"
            type="number"
            error={errors.price}
            {...register("price", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.price && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.price.message}
            </Alert>
          )}
        </Box>

        {/* quantity */}
        <Box sx={boxStyle}>
          <TextField
            label="Số lượng"
            type="number"
            error={errors.quantity}
            {...register("quantity", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.quantity && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.quantity.message}
            </Alert>
          )}
        </Box>

        {/* add image */}
        <Box sx={boxStyle}>
          <Button
            component="label"
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.commonColors,
              cursor: "pointer",
            }}
          >
            Upload
            <CustomInputFile type="file" onChange={handleSetImage} />
          </Button>
          <Grid
            container
            sx={{
              bgcolor: (theme) => theme.bgColor,
              margin: "10px 0",
            }}
            size={{ lg: 2, md: 3, sm: 4, xs: 6 }}
          >
            {listImage?.length === 0 ? (
              <Alert
                severity="warning"
                sx={{
                  m: "0.7em",
                  ".MuiAlert-message": { overflow: "hidden" },
                }}
              >
                Vui lòng chọn hình ảnh cho sản phẩm (Tối đa 10 ảnh)
              </Alert>
            ) : (
              listImage?.map((item, index) => (
                <Grid onClick={() => handleDeleteImage(item)} key={index}>
                  <Tooltip title="click to delete">
                    <img
                      src={item}
                      style={{
                        width: "200px",
                        border: "1px solid",
                        margin: "10px",
                      }}
                    />
                  </Tooltip>
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        {/* thuc ra ten la tag */}
        <ListTags handleSelectTags={handleSelectTags} />

        {/* size */}
        <SizesList open={openSizeList} handleSelectSize={handleSelectSize} />

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.commonColors,
            cursor: "pointer",
          }}
        >
          confirm
        </Button>
      </form>
    </Container>
  );
};

export default AddNewProduct;

import {
  Avatar,
  Box,
  Button,
  Divider,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ToggleFocusInput from "../../../components/customInputFile/ToggleFocusInput";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import { updateShopInfo } from "../../../api";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { singleFileValidator } from "../../../utils/valiodatorFile";
import { ListTags } from "../../../components/ListTags/ListTags";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "1200px",
};

const ModalUpdateShopInfo = ({ open, setOpen, shopInfo, fetchShopInfo }) => {
  const [valueDescription, setValueDescription] = useState(
    shopInfo?.description
  );
  const [listTags, setListTags] = useState([]);
  const [updateTagsMode, setUpdateTagsMode] = useState(false);

  const handleClose = () => setOpen(false);

  const handleUpdate = async (e, key) => {
    const data = {
      [key]: e,
    };
    await updateShopInfo(data).then((res) => {
      if (!res.error) {
        toast.success("Cập nhật thành công");
        fetchShopInfo();
      }
    });
  };
  const handleUpdateDescription = async () => {
    await updateShopInfo({ description: valueDescription }).then((res) => {
      if (!res.error) {
        toast.success("Cập nhật thành công");
        fetchShopInfo();
      }
    });
  };
  const handleUpdateTags = async (e, key) => {
    await updateShopInfo({ tagsProductShopSell: listTags }).then((res) => {
      if (!res.error) {
        toast.success("Cập nhật thành công");
        fetchShopInfo();
      }
    });
  };
  const uploadAvatar = (e) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    // console.log("e.target?.files[0]: ", e.target?.files[0]);
    const error = singleFileValidator(e.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData();
    reqData.append("logo", e.target?.files[0]);
    // Cách để log được dữ liệu thông qua FormData
    // console.log("reqData: ", reqData);
    // for (const value of reqData.values()) {
    //   console.log("reqData Value: ", value);
    // }

    toast
      .promise(updateShopInfo(reqData), {
        pending: "updating... ",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Cập nhật thành công");
          fetchShopInfo();
        }
        e.target.value = "";
      });
  };

  const handleSelectTags = (result) => {
    setListTags((preState) => {
      return result;
    });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Avatar
            src={shopInfo.logo}
            alt={shopInfo.name}
            sx={{
              width: 120,
              height: 120,
              mb: { xs: 2, md: 0 },
              boxShadow: 2,
            }}
          />
          <Box>
            <Button
              component="label"
              variant="contained"
              size="small"
              sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
            >
              Upload
              <CustomInputFile type="file" onChange={uploadAvatar} />
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Name */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography width={"200px"}>Tên cửa hàng:</Typography>
            <ToggleFocusInput
              value={shopInfo?.name}
              onChangedValue={(e) => handleUpdate(e, "name")}
            />
          </Box>

          {/* address */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography width={"200px"}>Địa chỉ:</Typography>
            <ToggleFocusInput
              value={shopInfo?.address}
              onChangedValue={(e) => handleUpdate(e, "address")}
            />
          </Box>

          {/* phoneNumber */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography width={"200px"}>Số điện thoại:</Typography>
            <ToggleFocusInput
              value={shopInfo?.phoneNumber}
              onChangedValue={(e) => handleUpdate(e, "phoneNumber")}
            />
          </Box>

          {/* tags */}
          <InputLabel
            id="demo-multiple-name-label"
            sx={{
              "&.Mui-focused": {
                color: "black",
              },
              color: "black",
            }}
          >
            Các loại sản phẩm sẽ bán
          </InputLabel>
          {!updateTagsMode ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {shopInfo?.tagsProductShopSell?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        border: "1px solid black",
                        p: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography variant="caption">{item}</Typography>
                    </Box>
                  );
                })}
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: (theme) => theme.commonColors,
                }}
                onClick={() => setUpdateTagsMode(!updateTagsMode)}
              >
                Chỉnh sửa
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListTags
                handleSelectTags={handleSelectTags}
                tagsIdData={shopInfo?.tagsProductShopSell}
              />

              <Button
                variant="contained"
                sx={{ bgcolor: (theme) => theme.commonColors, m: 3 }}
                onClick={handleUpdateTags}
              >
                Cập nhật
              </Button>
              <Button
                variant="contained"
                onClick={() => setUpdateTagsMode(!updateTagsMode)}
              >
                Tạm dừng
              </Button>
            </Box>
          )}

          {/* description */}
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mb: 0.5,
                justifyContent: "space-between",
              }}
            >
              <Typography width={"200px"}>Mô tả:</Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: (theme) => theme.commonColors, my: 3 }}
                size="small"
                onClick={handleUpdateDescription}
              >
                Cập nhật
              </Button>
            </Box>
            <MDEditor
              value={valueDescription}
              preview="edit"
              onChange={setValueDescription}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUpdateShopInfo;

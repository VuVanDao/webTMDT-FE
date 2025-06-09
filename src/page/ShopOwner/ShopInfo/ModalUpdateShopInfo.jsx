import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import ToggleFocusInput from "../../../components/customInputFile/ToggleFocusInput";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import { updateShopInfo } from "../../../api";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { singleFileValidator } from "../../../utils/valiodatorFile";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalUpdateShopInfo = ({ open, setOpen, shopInfo, fetchShopInfo }) => {
  const [valueDescription, setValueDescription] = useState(
    shopInfo?.description
  );
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
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
          <Box
            sx={{
              width: "120px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "500px",
            }}
          >
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
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography width={"200px"}>Địa chỉ:</Typography>
              <ToggleFocusInput
                value={shopInfo?.address}
                onChangedValue={(e) => handleUpdate(e, "address")}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography width={"200px"}>Số điện thoại:</Typography>
              <ToggleFocusInput
                value={shopInfo?.phoneNumber}
                onChangedValue={(e) => handleUpdate(e, "phoneNumber")}
              />
            </Box>
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
                  sx={{ bgcolor: (theme) => theme.commonColors }}
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
      </Box>
    </Modal>
  );
};

export default ModalUpdateShopInfo;

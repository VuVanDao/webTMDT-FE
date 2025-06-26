import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useEffect, useState } from "react";
import { getAllShopAdminManager } from "../../../api";
import { updateBrand } from "../../../api/brandAPI/brandAPI";
import { toast } from "react-toastify";
import _ from "lodash";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "90vh",
  overflowY: "scroll",
  width: "90vw",
  minWidth: "1300px",
};

export const ModalDetailBrand = ({
  open,
  setOpen,
  infoBrand,
  handleGetAllBrand,
}) => {
  const [listShop, setListShop] = useState([]);
  const [openSelection, setOpenSelection] = useState(false);
  const [shopSelected, setShopSelected] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setShopSelected(value);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleGetAllShop = async () => {
    const res = await getAllShopAdminManager();
    if (!res.error) {
      setListShop(res);
    }
  };

  const handleSetShop = async () => {
    let listShopClone = _.cloneDeep(listShop);
    let result = [];
    listShopClone?.map((item) => {
      shopSelected?.map((i) => {
        if (item?.name.includes(i))
          result.push({
            id: item?._id,
            name: item?.name,
            logo: item?.logo,
          });
      });
    });

    updateBrand({ shopOwnerBrand: result }, infoBrand?._id).then((res) => {
      if (!res?.error) {
        toast.success("Thao tác thành công");
        handleGetAllBrand();
      }
    });
  };
  useEffect(() => {
    handleGetAllShop();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }}>
            <img
              src={infoBrand?.brandImage}
              style={{
                width: "400px",
                height: "200px",
                border: "1px solid black",
                borderRadius: "10px",
              }}
            />
          </Box>
          <Divider sx={{ my: 5 }} />
          <Typography variant="h5">Tên: {infoBrand?.brandName}</Typography>
          <Typography variant="h6">
            Cửa hàng sở hữu thương hiệu hợp pháp
          </Typography>
          {infoBrand?.shopOwnerBrand?.length > 0
            ? infoBrand?.shopOwnerBrand?.map((item) => (
                <Box>
                  <img
                    src={infoBrand?.brandImage}
                    style={{
                      width: "150px",
                      height: "100px",
                      border: "1px solid black",
                    }}
                  />
                  <Typography>{item?.name}</Typography>
                </Box>
              ))
            : "Hiện chưa có cửa hàng sở hữu"}
          <Button
            sx={{
              bgcolor: (theme) => theme.commonColors,
              mx: 2,
              mt: 2,
            }}
            variant="contained"
            onClick={() => setOpenSelection(!openSelection)}
            size="small"
          >
            Gán cửa hàng sở hữu thương hiệu
          </Button>

          {openSelection && (
            <Box>
              <FormControl sx={{ my: 1 }} fullWidth>
                <InputLabel
                  id="demo-multiple-chip-label"
                  sx={{
                    "&.Mui-focused": {
                      color: "black",
                    },
                  }}
                >
                  Chọn cửa hàng
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={shopSelected}
                  onChange={handleChange}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  }}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label=" Chọn cửa hàng "
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected?.map((value) => {
                        return <Chip key={value} label={value} />;
                      })}
                    </Box>
                  )}
                >
                  {listShop?.map((item) => {
                    return (
                      <MenuItem key={item?._id} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Box sx={{ textAlign: "end" }}>
                <Button
                  sx={{
                    bgcolor: (theme) => theme.commonColors,
                    color: "white",
                    mr: 2,
                  }}
                  variant="contained"
                  onClick={() => handleSetShop()}
                >
                  Xác nhận
                </Button>
                <Button
                  sx={{
                    color: "white",
                    mr: 2,
                  }}
                  variant="contained"
                  color="warning"
                  onClick={() => setShopSelected([])}
                >
                  xoá tất cả
                </Button>
                <Button
                  sx={{ color: "white" }}
                  variant="contained"
                  color="info"
                  onClick={() => setOpenSelection(!openSelection)}
                >
                  dừng lại
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

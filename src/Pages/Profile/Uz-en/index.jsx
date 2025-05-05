import { Button, Card, Empty, Tag, notification } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setUzEnEditStackModal, setUzEnModal } from "../../../redux/modalSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";

const UzEn = () => {
  const auth = useAuthUser()();
  const { uzEn } = useSelector((state) => state.modal);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const { data = [] } = useQuery(
    ["/uz-en", uzEn],
    () =>
      axios(
        `https://back.leksika.uz/user/new-word/uz-en/get?ref_id=${
          auth?.id ?? ""
        }`
      ).then((res) => res.data.data),
    { refetchOnWindowFocus: false }
  );

  // useEffect(() => {
  //   try {
  //     axios(
  //       `https://back.leksika.uz/user/new-word/uz-en/get?ref_id=${
  //         auth?.id ?? ""
  //       }`
  //     )
  //       .then((res) => setData(res.data.data))
  //       .catch((err) => {
  //         console.log(err);
  //         notification.error({ message: err.response.data.extraMessage });
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     notification.error({ message: error.message });
  //   }
  // }, [uzEn]);

  return (
    <div className="en_uz_container">
      <Button
        style={{ backgroundColor: "#01756C" }}
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => dispatch(setUzEnEditStackModal())}
      >
        Uz-En
      </Button>
      {data.length ? (
        data.map((value, idx) => (
          <Card
            key={idx}
            style={{
              width: "100%",
              marginTop: 16
            }}
            actions={[
              <Tag color="warning">{value.status}</Tag>,
              <EditOutlined
                onClick={() =>
                  dispatch(setUzEnEditStackModal({ ...value, type: "PUT" }))
                }
                key="edit"
              />
              // <DeleteOutlined key="delete" />,
            ]}
          >
            <Meta
              title={value.word}
              description={
                <div>
                  <div
                    dangerouslySetInnerHTML={{ __html: value.description }}
                  ></div>
                </div>
              }
            />
          </Card>
        ))
      ) : (
        <Empty style={{ marginTop: "50px" }} />
      )}
    </div>
  );
};

export default UzEn;

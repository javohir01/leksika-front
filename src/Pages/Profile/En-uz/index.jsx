import { Button, Card, Empty, Tag, notification } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setEnUzEditStackModal, setEnUzModal } from "../../../redux/modalSlice";
import { EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";

const EnUz = () => {
  const auth = useAuthUser()();
  const { enUz } = useSelector((state) => state.modal);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const { data = [] } = useQuery(
    ["/en-uz", enUz],
    () =>
      axios(
        `https://back.leksika.uz/user/new-word/en-uz/get?ref_id=${
          auth?.id ?? ""
        }`
      ).then((res) => res.data.data),
    { refetchOnWindowFocus: false }
  );

  // useEffect(() => {
  //   try {
  //     axios(
  //       `https://back.leksika.uz/user/new-word/en-uz/get?ref_id=${
  //         auth?.id ?? ""
  //       }`
  //     )
  //       .then((res) => setData(res.data.data))
  //       .catch((err) => {
  //         console.log(err);
  //         notification.error({ message: err.response.data.extraMessage });
  //       });
  //   } catch (error) {
  //     notification.error({ message: error.message });
  //   }
  // }, [enUz]);

  return (
    <div className="en_uz_container">
      <Button
        style={{ backgroundColor: "#01756C" }}
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => dispatch(setEnUzModal())}
      >
        En-Uz
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
                  dispatch(setEnUzEditStackModal({ ...value, type: "PUT" }))
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
                  <p>{value?.transc}</p>
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

export default EnUz;

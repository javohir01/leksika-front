import { Button, Form, Input, Modal, Space, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setEnUzEditStackModal } from "../../../../redux/modalSlice";
import { useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import ReactQuill from "react-quill";
import { useQueryClient } from "react-query";
import { useAuthUser } from "react-auth-kit";

const EnUzEditStackModal = () => {
  const auth = useAuthUser()();
  const queryClient = useQueryClient();
  const [form] = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { enUzEditStack, enUz } = useSelector((state) => state.modal);

  const onFinish = async (e) => {
    setLoading(true);
    try {
      console.log(enUzEditStack.data);
      await axios({
        url: "https://back.leksika.uz/user/new-word/en-uz/edit",
        method: enUzEditStack.data.type ?? "POST",
        data: { ...enUzEditStack.data, ...e, ref_id: auth?.id ?? "" }
      });

      queryClient.setQueryData(["/en-uz", enUz], (oldQuery) => {
        return oldQuery?.map((value) =>
          value.id === enUzEditStack.data.id
            ? { ...enUzEditStack.data, ...e }
            : value
        );
      });

      notification.success({ message: "We're about to view your editings." });
      dispatch(setEnUzEditStackModal());
    } catch (error) {
      console.log(error);
      notification.error({ message: "Your account has been banned!" });
    }
    form.resetFields();
    setLoading(false);
  };

  return (
    <Modal
      centered
      open={enUzEditStack.open}
      onCancel={() => dispatch(setEnUzEditStackModal())}
      title="En-Uz word edit"
      footer={false}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        initialValues={{
          word: enUzEditStack.data?.word,
          transc: enUzEditStack.data?.transc,
          description: enUzEditStack.data?.description
        }}
      >
        <Form.Item
          name="word"
          label="Word"
          rules={[
            {
              required: true,
              message: "Please enter a word!"
            }
          ]}
        >
          <Input placeholder="Word..." />
        </Form.Item>
        <Form.Item
          name="transc"
          label="Transcript"
          rules={[
            {
              required: true,
              message: "Please enter a transcript!"
            }
          ]}
        >
          <Input placeholder="Transcript..." />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter a description!"
            }
          ]}
        >
          <ReactQuill
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],

                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],

                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],

                ["clean"]
              ]
            }}
            placeholder="Description..."
          />
        </Form.Item>
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={() => dispatch(setEnUzEditStackModal())}
              htmlType="button"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {loading ? <LoadingOutlined /> : "Add"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EnUzEditStackModal;

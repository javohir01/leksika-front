import { Button, Form, Input, Modal, Space, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUzEnEditStackModal } from "../../../../redux/modalSlice";
import { useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import ReactQuill from "react-quill";
import { useQueryClient } from "react-query";
import { useAuthUser } from "react-auth-kit";

const UzEnEditStackModal = () => {
  const auth = useAuthUser()();
  const queryClient = useQueryClient();
  const [form] = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { uzEnStackEdit, uzEn } = useSelector((state) => state.modal);

  const onFinish = async (e) => {
    setLoading(true);
    try {
      await axios({
        url: "https://back.leksika.uz/user/new-word/uz-en/edit",
        method: uzEnStackEdit.data.type ?? "POST",
        data: { ...uzEnStackEdit.data, ...e, ref_id: auth?.id ?? "" }
      });

      queryClient.setQueryData(["/uz-en", uzEn], (oldQuery) => {
        return oldQuery?.map((value) =>
          value.id === uzEnStackEdit.data.id
            ? { ...uzEnStackEdit.data, ...e }
            : value
        );
      });

      notification.success({ message: "We're about to view your editings." });
      dispatch(setUzEnEditStackModal());
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
      open={uzEnStackEdit.open}
      onCancel={() => {
        dispatch(setUzEnEditStackModal());
        form.resetFields();
      }}
      title="Uz-En word edit"
      footer={false}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        initialValues={{
          word: uzEnStackEdit.data?.word,
          description: uzEnStackEdit.data?.description
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
              onClick={() => {
                dispatch(setUzEnEditStackModal());
                form.resetFields();
              }}
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

export default UzEnEditStackModal;

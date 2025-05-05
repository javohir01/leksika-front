import { Button, Form, Input, Modal, Space, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setEnUzEditModal } from "../../../../redux/modalSlice";
import { useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import ReactQuill from "react-quill";

const EnUzEditModal = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { enUzEdit } = useSelector((state) => state.modal);

  const onFinish = async (e) => {
    setLoading(true);
    try {
      await axios({
        url: "https://back.leksika.uz/words/en-uz/edit",
        method: "PUT",
        data: { ...enUzEdit.data, ...e }
      });

      notification.success({ message: "We're about to view your editings." });
      dispatch(setEnUzEditModal());
    } catch (error) {
      notification.error({ message: "Your account has been banned!" });
    }
    form.resetFields();
    setLoading(false);
  };

  return (
    <Modal
      centered
      open={enUzEdit.open}
      onCancel={() => dispatch(setEnUzEditModal())}
      title="En-Uz word edit"
      footer={false}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        initialValues={{
          word: enUzEdit.data?.word,
          transc: enUzEdit.data?.transc,
          description: enUzEdit.data?.description
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
              onClick={() => dispatch(setEnUzEditModal())}
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

export default EnUzEditModal;

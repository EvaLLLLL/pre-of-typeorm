import React from 'react'
import { Form, Modal, Input, InputNumber } from 'antd'
import { ModalInnerProps } from '../../types'
import { UserStore } from '../../models/UserStore'
import { Instance } from 'mobx-state-tree'
import { observer } from 'mobx-react-lite'

export const AddUserModal = observer<{ store: Instance<typeof UserStore> }>(
  ({ store: userStore }) => {
    const [addUserForm] = Form.useForm()
    const { addModalVisible, toggleAddModalVisible, add } = userStore

    React.useEffect(() => {
      addUserForm.resetFields()
    }, [addModalVisible, addUserForm])

    return (
      <AddUserModalInner
        form={addUserForm}
        visible={addModalVisible}
        onCancel={toggleAddModalVisible}
        onOk={async () => {
          const values = await addUserForm.validateFields()
          if (!values) return

          add(values)
          toggleAddModalVisible()
        }}
      />
    )
  },
)

const AddUserModalInner: React.FC<ModalInnerProps> = ({
  visible,
  onCancel,
  form,
  onOk,
}) => {
  return (
    <Modal
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      title="add user"
      onOk={onOk}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="age"
          name="age"
          rules={[
            {
              required: false,
              type: 'number',
              message: 'Please input your age',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}

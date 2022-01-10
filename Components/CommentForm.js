import { Modal } from "antd"

const CommentForm = ({
  comment,
  addComment,
  setComment,
  visible,
  setVisible,
}) => {
  return (
    <>
      {" "}
      <Modal
        title='Comment'
        onCancel={() => setVisible(false)}
        visible={visible}
        footer={null}
      >
        <form onSubmit={(e) => addComment(e)}>
          <input
            type='text'
            className='form-control'
            placeholder='Write something...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <div className='pt-3 '>
            <button className='btn btn-primary '>Submit</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default CommentForm

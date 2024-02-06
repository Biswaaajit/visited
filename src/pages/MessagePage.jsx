/* eslint-disable react/prop-types */
const cover = {
  fontSize: "24px",
  margin: " 0px 15% ",
  textAlign: "center",
};
function MessagePage({ children }) {
  return <div style={cover}>{children}</div>;
}

export default MessagePage;

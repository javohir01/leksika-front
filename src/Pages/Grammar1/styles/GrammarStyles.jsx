const styles = {
    container: {
      border: "1px solid ",
    backgroundColor: "#f8f8f8",
    padding: "60px",
    borderRadius: "10px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "42px",
    fontWeight: "bold",
    margin: "0",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "40px",
  },
  list: {
  position: "relative",
    listStyleType: "none",
    padding: "0",
    margin: "0",
    alignItems: "flex-start",
  },
  item: {
    margin: "20px 0",
    transition: "transform 0.2s",
    cursor: "pointer",
    transformOrigin: "left",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "28px",
    transition: "color 0.2s",
    display: "flex",
    alignItems: "center",
  },
  number: {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
      borderRadius: "50%",
    backgroundColor: "#01756C",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "30px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  },
  itemHover: {
    transform: "translateX(10px)",
  },
  linkHover: {
    color: "#00a4b4",
  },
};


export default styles
import "./style.css";
import EnUz from "./En-uz";
import UzEn from "./Uz-en";
import "react-quill/dist/quill.snow.css";

const Profile = () => {
  return (
    <div style={{ marginBottom: "100px" }}>
      <div className="main-profile-wrapper">
        <EnUz />
        <div className="divider" />
        <UzEn />
      </div>
    </div>
  );
};

export default Profile;

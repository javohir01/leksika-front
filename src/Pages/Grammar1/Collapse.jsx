import React, { useState } from "react";
import { CButton, CCollapse, CCard, CCardBody } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Collapse.css";
function Collapse() {
 const [visible, setVisible] = useState(false);
 return (
   <>
     <CButton className={".cbtn-activate"} onClick={() => setVisible(!visible)}>Button</CButton>
     <div style={{ display: "block", marginBottom: "-100px" }}>
       <CCollapse visible={visible}>
         <CCard className="mt-3">
           <CCardBody>
             Anim pariatur cliche reprehenderit, enim eiusmod high life
             accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica,
             craft beer labore wes anderson cred nesciunt sapiente ea proident.
           </CCardBody>
         </CCard>
       </CCollapse>
     </div>
   </>
 );
}

export default Collapse
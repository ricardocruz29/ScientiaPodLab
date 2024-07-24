import useAuthRedirect from "../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../hooks/useChangeActiveSidebar";
import { useParams } from "react-router-dom";
import { useGetTemplateQuery } from "../../../redux/api/services/templateService";
import styles from "./template.module.css";
import { Typography } from "@mui/material";
import { Skeleton } from "@mui/material";

function Template() {
  //Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("resources");

  const { id } = useParams();

  console.log("id: ", id);
  // Get data
  const { data, isLoading } = useGetTemplateQuery({ templateID: id });

  console.log("data: ", data);

  //TODO ------------------
  /*
  - Copy the logic from the template card to present the data
  - Create big text for the description
  - Duplicate and Delete do the same from the previous page
  - Edit -> Create modal to choose a new card (Create Component) and make the sequence draggable. Maybe add buttons to save it 
  */
  //TODO -------------------

  return (
    <div className={styles.page_container}>
      {isLoading ? (
        <Skeleton variant="rectangular" width={1300} height={720} />
      ) : (
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {data.name}
        </Typography>
      )}
    </div>
  );
}

export default Template;

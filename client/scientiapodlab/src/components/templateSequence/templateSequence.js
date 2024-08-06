import { Typography } from "@mui/material";
import styles from "./templateSequence.module.css";
import { TEMPLATE_TYPE } from "../../lib/constants/template";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AudioPlayer from "../audioPlayer/audioPlayer";

function TemplateSequence({
  size = "medium",
  template,
  actions,
  isDraggable = false,
  onDragEnd,
  selectedSegment,
}) {
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, _) => (
            <div
              ref={provided.innerRef}
              className={styles.template_sequence}
              {...provided.droppableProps}
            >
              {template?.map((item, index) => (
                <Draggable
                  isDragDisabled={!isDraggable}
                  key={item.ID}
                  draggableId={item.ID?.toString()}
                  index={index}
                >
                  {(provided, _) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        key={index}
                        className={`${styles.template_sequence_card} ${
                          size === "small" &&
                          styles.template_sequence_card_small
                        } ${
                          selectedSegment === item.ID &&
                          styles.template_sequence_card_on_add
                        }`}
                        style={{
                          backgroundColor: TEMPLATE_TYPE[item.type].color,
                        }}
                      >
                        <Typography
                          variant={size === "medium" ? "h6" : "caption"}
                          sx={{ color: "#00000060" }}
                        >
                          {TEMPLATE_TYPE[item.type].label}
                        </Typography>
                        {/* If Has Audio */}
                        {item.audio && size !== "small" && (
                          <div className={styles.template_sequence_card_audio}>
                            <div
                              className={
                                styles.template_sequence_card_audio_row
                              }
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "#343A40" }}
                              >
                                {item.audio.name}
                              </Typography>
                              {actions && actions.onRemove && (
                                <div
                                  onClick={() => {
                                    actions.onRemove(item.ID);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <CloseIcon
                                    sx={{ color: "rgb(255, 0 , 0)" }}
                                    fontSize="small"
                                  />
                                </div>
                              )}
                            </div>
                            <AudioPlayer
                              size="small"
                              showTime={false}
                              audioFile={item.audio.url}
                            />
                          </div>
                        )}
                        {actions && actions.onAdd && !item.audio && (
                          <button
                            className={styles.template_sequence_card_add}
                            onClick={() => {
                              actions.onAdd(item.ID);
                            }}
                          >
                            <AddIcon fontSize="small" sx={{ color: "#fff" }} />
                          </button>
                        )}
                        {actions && actions.onRemoveTemplateSection && (
                          <button
                            onClick={() => {
                              actions.onRemoveTemplateSection(item.ID);
                            }}
                            className={styles.template_sequence_card_remove}
                          >
                            <RemoveIcon
                              fontSize="small"
                              sx={{ color: "#fff" }}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default TemplateSequence;

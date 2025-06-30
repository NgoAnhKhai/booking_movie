import React, { useRef, useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";

function ClampText({ children, line = 2, sx }) {
  const ref = useRef();
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    // Chỉ check clamp khi chưa expand (đo ở trạng thái giới hạn)
    if (!expanded) {
      setClamped(el.scrollHeight > el.offsetHeight + 2);
    }
  }, [children, expanded]);

  return (
    <>
      <Typography
        ref={ref}
        color="#c5c5d1"
        fontSize={15}
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: expanded ? "unset" : line,
          maxHeight: expanded ? "none" : `${line * 1.45}em`,
          position: "relative",
          transition: "all .2s",
          ...sx,
        }}
      >
        {children}
      </Typography>
      {/* Hiện "Xem thêm" khi bị clamp, hoặc "Thu gọn" khi đã expand */}
      {(clamped || expanded) && (
        <Button
          variant="text"
          size="small"
          sx={{
            color: "#B43FEB",
            fontWeight: 700,
            fontSize: 15,
            ml: 0,
            mt: "-2px",
            px: 0.4,
            textTransform: "none",
            cursor: "pointer",
            minHeight: 0,
            minWidth: 0,
            "&:hover": { color: "#9339d4", bgcolor: "transparent" },
          }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Shrink" : "Expand"}
        </Button>
      )}
    </>
  );
}

export default ClampText;

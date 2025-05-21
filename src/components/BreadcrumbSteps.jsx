import React from "react";
import { Box, Typography } from "@mui/material";

const steps = ["booking", "seat", "food", "payment"];

const BreadcrumbSteps = ({ currentStep }) => {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {steps.map((step, index) => {
        const isActive = step === currentStep;
        const isLast = index === steps.length - 1;
        return (
          <React.Fragment key={step}>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: 14,
                color: isActive ? "#b71c1c" : "#999",
                fontWeight: isActive ? "bold" : "normal",
                userSelect: "none",
              }}
            >
              {step}
            </Typography>
            {!isLast && (
              <Typography
                sx={{ color: "#999", fontSize: 14, userSelect: "none" }}
              >
                &nbsp;&rarr;&nbsp;
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default BreadcrumbSteps;

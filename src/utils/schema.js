import React, { useState } from "react";


function generateSchema(data) {
  if (data === null || data === undefined) {
    return { type: "null" };
  }

  if (Array.isArray(data)) {
    return {
      type: "array",
      items: data.length > 0 ? generateSchema(data[0]) : { type: "string" },
    };
  }

  if (typeof data === "object") {
    const properties = {};
    Object.keys(data).forEach((key) => {
      properties[key] = generateSchema(data[key]);
    });
    return {
      type: "object",
      properties,
    };
  }

  return { type: typeof data };
}

function getValueByPath(obj, path) {
  return path.reduce((current, key) => current?.[key], obj);
}

function setValueByPath(obj, path, value) {
  if (path.length === 0) return value;

  const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  const [current, ...rest] = path;

  if (rest.length === 0) {
    newObj[current] = value;
  } else {
    newObj[current] = setValueByPath(obj[current] || {}, rest, value);
  }

  return newObj;
}

// Helper to format field names into readable labels
// function formatLabel(key) {
//   if (!key || typeof key !== "string") return "Field";
//   return key
//     .replace(/([A-Z])/g, " $1")
//     .replace(/^./, (str) => str.toUpperCase())
//     .replace(/_/g, " ");
// }

export { generateSchema, getValueByPath, setValueByPath };

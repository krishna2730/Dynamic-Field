import { useState } from "react";

function Card({
  title,
  children,
  icon,
  collapsible = false,
  defaultOpen = true,
  badge,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="card">
      <div
        className="card-header"
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div className="card-title-group">
          {collapsible && (
            <span className="expand-icon">{isOpen ? "-" : "+"}</span>
          )}
          {icon && <span className="card-icon">{icon}</span>}
          <h3 className="card-title">{title}</h3>
          {badge && <span className="card-badge">{badge}</span>}
        </div>
      </div>
      {isOpen && <div className="card-body">{children}</div>}
    </div>
  );
}

export default Card;

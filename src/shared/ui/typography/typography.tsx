import * as React from "react";
import classNames from "classnames";
import styles from "./typography.module.scss";

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: "title" | "subtitle" | "button" | "p-44" | "p-32" | "p-20" | "p-18" | "p-16" | "p-14";
  /** Html-тег */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  /** Начертание шрифта */
  weight?: "normal" | "medium" | "semibold" | "bold";
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: "primary" | "secondary" | "accent" | "success" | "error";
  /** Максимальное кол-во строк */
  maxLines?: number;
};

export const Typography: React.FC<TextProps> = ({
  className,
  view,
  tag = "p",
  weight,
  children,
  color,
  maxLines,
}) => {
  const Element = tag;
  let isClamped = false;
  let extraStyles: { [key: string]: string } = {};

  if (maxLines !== undefined && typeof maxLines === "number") {
    extraStyles = { ...extraStyles, WebkitLineClamp: maxLines.toString() };
    isClamped = true;
  }

  return (
    <Element
      className={classNames(
        { [styles[`view_${view}`]]: view },
        { [styles.clamped]: isClamped },
        { [styles[`text_${color}`]]: color },
        { [styles[`text_${weight}`]]: weight },
        className
      )}
      style={extraStyles}
    >
      {children}
    </Element>
  );
};

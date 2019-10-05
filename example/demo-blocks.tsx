import * as React from 'react';

interface DemoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export const DemoSection: React.FC<DemoSectionProps> = ({
  title,
  description,
  children,
  ...props
}) => (
  <section className="c-demo-section" {...props}>
    <div className="c-demo-section__info">
      <h1
        className="c-demo-section__title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className="c-demo-section__description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
    <div className="c-demo-section__body">{children}</div>
  </section>
);

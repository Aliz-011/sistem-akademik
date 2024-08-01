export const Header = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="space-y-2">
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
        {title}
      </h1>
      <span className="text-muted-foreground text-sm">{subtitle}</span>
    </div>
  );
};

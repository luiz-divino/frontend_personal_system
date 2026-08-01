import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const NoData = ({
  page,
  message,
}: {
  page: string;
  message: string;
}) => {
  return (
    <Card className="rounded-md w-full">
      <CardHeader>
        <div>
          <CardTitle className="text-base md:text-xl text-text-register">
            Não há <span className="font-semibold">{page}</span> disponíveis no
            momento
          </CardTitle>
        </div>
        <CardDescription className="text-text-sidebar">
          {message}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const NoData = ({
  page,
  message,
}: {
  page: string;
  message: string;
}) => {
  return (
    <Card className="rounded-md">
      <CardHeader className="text-center">
        <div>
          <CardTitle className="text-base md:text-xl text-white">
            Não há <span className="font-semibold">{page}</span> disponíveis no
            momento
          </CardTitle>
        </div>
        <CardDescription className="text-text-sidebar">{message}</CardDescription>
      </CardHeader>
    </Card>
  );
};

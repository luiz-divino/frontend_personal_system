import { Task } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { UpdateTask } from "./UpdateTask";
import { Calendar, ListTodo, ShieldAlert, SquarePen, Tags } from "lucide-react";
import { PRIORITY_UI, STATUS_UI } from "@/app/utils/task-mappings";

interface props {
  data: Task[];
}

export function TableTask({ data }: props) {
  const statusConfig = STATUS_UI;
  const priorityConfig = PRIORITY_UI;
  return (
    <Table className=" border border-gray-500">
      <TableHeader>
        <TableRow className="w-full">
          <TableHead>
            <span className="flex items-center justify-start gap-1">
              Titulo
              <Tags className="w-5 h-5" />
            </span>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <span className="flex items-center justify-start gap-1">
              Status
              <ListTodo className="w-5 h-5" />
            </span>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <span className="flex items-center justify-start gap-1">
              prioridade
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <span className="flex items-center justify-start gap-1">
              Data
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </TableHead>
          <TableHead className=" w-12.5">
            <span className="flex items-center md:items-center justify-center gap-1">
              Opções
              <SquarePen className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length != 0 &&
          data.map((task) => {
            const dataFormatada = task.deadLine
              ? task.deadLine.split("T")[0].split("-").reverse().join("/")
              : "Sem data";
            return (
              <TableRow key={task.id}>
                <TableCell>
                  <div>{task.title}</div>
                  <p className="text-sm text-muted-foreground hidden md:flex">
                    {task.description}
                  </p>
                  <div className="text-xs md:hidden text-muted-foreground mt-1 flex flex-col gap-1">
                    <span>{task.priority}</span>
                    <span>{dataFormatada}</span>
                  </div>
                </TableCell>
                <TableCell className=" hidden md:table-cell">
                  <div className="flex justify-start items-center">
                    {statusConfig.map((item) => {
                      if (item.label === task.status) {
                        return (
                          <div
                            key={item.label}
                            className={`${item.color} flex p-1 gap-1 justify-center items-center rounded-full text-sm`}
                          >
                            {item.icon}
                            <p>{task.status.toLowerCase()}</p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="flex justify-start items-center">
                    {priorityConfig.map((priority) => {
                      if (priority.label === task.priority) {
                        return (
                          <div
                            key={priority.label}
                            className={`${priority.color} flex md:px-2 text-sm gap-2 rounded-full`}
                          >
                            {priority.icon}
                            <p>{task.priority.toLowerCase()}</p>
                          </div>
                        );
                      }
                    })}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {dataFormatada}
                </TableCell>
                <TableCell>
                  <section className="flex flex-col mt-2 items-center justify-center">
                    <div className="flex md:hidden justify-center items-center">
                      {statusConfig.map((item) => {
                        if (item.label === task.status) {
                          return (
                            <div
                              key={item.label}
                              className={`${item.color} flex p-1 gap-1 justify-center items-center rounded-full text-sm`}
                            >
                              {item.icon}
                              <p>{task.status.toLowerCase()}</p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </section>
                  <UpdateTask task={task} />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

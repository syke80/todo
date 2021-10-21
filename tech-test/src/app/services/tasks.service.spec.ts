import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { TasksService } from "./tasks.service";
import { Task } from "../models/task";

const apiUrl = "apiurl.com";

const mockItem1 = {
  id: 1,
  label: "Kitchen Cleanup",
  description: "Clean my dirty kitchen",
  category: "house",
  done: false,
};
const mockItem2 = {
  id: 2,
  label: "Taxes",
  description:
    "Start doing my taxes and contact my 1accountant jhon for advice",
  category: "bureaucracy",
  done: "19-10-2021",
};

describe("TasksService", () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });
    service = TestBed.get(TasksService);
    httpMock = TestBed.get(HttpTestingController);
    environment.apiUrl = apiUrl;
  });

  it("should get all items", (done: DoneFn) => {
    service.getAll().subscribe((result) => {
      expect(result).toEqual([mockItem1, mockItem2]);
      done();
    });

    const request = httpMock.expectOne(`${apiUrl}/tasks`);
    expect(request.request.method).toBe("GET");
    request.flush([mockItem1, mockItem2]);
  });

  it("should delete item", (done: DoneFn) => {
    service.delete(mockItem1).subscribe((result) => {
      expect(result).toEqual({});
      done();
    });

    const request = httpMock.expectOne(`${apiUrl}/tasks/${mockItem1.id}`);
    expect(request.request.method).toBe("DELETE");
    request.flush({});
  });

  it("should update text fields", (done: DoneFn) => {
    const itemsTextFields: Partial<Task> = {
      label: "updated label",
      description: "updated description",
      category: "updated category",
    };
    const updatedItem: Task = { ...mockItem1, ...itemsTextFields };
    const mockResponse: Task = { ...mockItem1, ...itemsTextFields };

    service.update(updatedItem).subscribe((result) => {
      expect(result).toEqual(updatedItem);
      done();
    });

    const request = httpMock.expectOne(`${apiUrl}/tasks/${mockItem1.id}`);
    expect(request.request.body).toEqual(itemsTextFields);
    expect(request.request.method).toBe("PATCH");
    request.flush(mockResponse);
  });

  it("should update status", (done: DoneFn) => {
    const statusField: Partial<Task> = {
      done: "01-02-2021",
    };
    const updatedItem: Task = { ...mockItem1, ...statusField };
    const mockResponse: Task = { ...mockItem1, ...statusField };

    service.updateStatus(updatedItem).subscribe((result) => {
      expect(result).toEqual(updatedItem);
      done();
    });

    const request = httpMock.expectOne(`${apiUrl}/tasks/${mockItem1.id}`);
    expect(request.request.body).toEqual(statusField);
    expect(request.request.method).toBe("PATCH");
    request.flush(mockResponse);
  });

  it("should create item", (done: DoneFn) => {
    const newItem: Task = {
      id: null,
      label: mockItem1.label,
      category: mockItem1.category,
      description: mockItem1.description,
      done: false,
    };
    const createdItem = { ...newItem, id: 1 };
    service.create(newItem).subscribe((result) => {
      expect(result).toEqual(createdItem);
      done();
    });

    const request = httpMock.expectOne(`${apiUrl}/tasks/`);
    expect(request.request.body).toEqual(newItem);
    expect(request.request.method).toBe("POST");
    request.flush(createdItem);
  });

  afterEach(() => {
    httpMock.verify();
  });
});

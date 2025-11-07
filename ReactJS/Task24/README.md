# Hướng dẫn làm bài - Bài kiểm tra ReactJS nâng cao

- **Thời gian làm bài**: 120 phút.
- **Yêu cầu môi trường**:
  - Tải Repository mẫu này về máy và thực hiện code trực tiếp trong thư mục này.
  - Sau khi hoàn thành, chấm bài tại lớp.
  - **Tắt tất cả các extension AI** (như Tabnine, GitHub Copilot, Codeium, v.v.) trong quá trình làm bài.
  - Được phép sử dụng các tài liệu tham khảo giao diện hoặc documentations của thư viện như **TailwindCSS**, **Bootstrap**, **Material-UI**, **Boxicons**, hoặc **FontAwesome**, **JSON-Server**, **React-router**, v.v.
- **Công cụ backend**: Sử dụng `json-server` để mock API.

---

## Yêu cầu

Xây dựng ứng dụng **Project Management System (PMS)** sử dụng **ReactJS** và **json-server**, với các tính năng sau:

---

## 1. Giao diện và routing (1 điểm)

- Xây dựng hệ thống định tuyến để dễ dàng điều hướng cho những tác vụ phía dưới.
- Xử lý route không tồn tại (404).
- Giao diện thân thiện và dễ sử dụng, có thể sử dụng CSS hoặc thư viện UI đơn giản.

## 2. Auth (3 điểm)

- **Đăng ký** vào hệ thống (bao gồm email, password, fullname).
  - Role mặc định là `member`.
  - Đăng ký thành công chuyển sang trang đăng nhập.
  - Đăng ký thất bại, reset form và hiển thị lỗi.
- **Đăng nhập** vào hệ thống (bao gồm email, password).
  - Đăng nhập thành công & lưu token và thông tin người dùng trong localStorage.
- **Protected Route**: (xây dựng các tuyến đường được bảo vệ).
  - Nếu role là `admin`, chuyển vào trang danh sách dự án.
  - Nếu role khác, thông báo: "Forbidden: You do not have access to this resource."

**Validation:**

- `email`: phải đúng định dạng email.
- `password`: phải có ít nhất 6 ký tự.
- Trừ 0.5 điểm nếu không validation

---

## 3. Quản lý Dự án (Projects) (2 điểm)

- Url: `/projects`
- **GET**: Lấy danh sách dự án từ API và hiển thị thông tin: tên, trạng thái, nút bấm `xoá`, `sửa`, `xem chi tiết`.
- **POST**: Thêm dự án mới qua form.
- **PUT**: Cập nhật thông tin dự án.
- **DELETE**: Xóa dự án (thêm xác nhận trước khi xóa).

- Các tính năng sau khi thực hiện thành công đều quay trở về trang danh sách dự án.

- **Validation**:
  - `title`: bắt buộc, tối thiểu 3 ký tự.
  - `description`: Không bắt buộc.
  - `status`: bắt buộc, mang giá trị `not-started`, `in-progress`, `completed`.

---

## 4. Quản lý Nhiệm vụ (Tasks) (2 điểm)

- **GET**: Lấy danh sách nhiệm vụ theo project.
  - Khi ấn "Xem chi tiết" từ màn hình danh sách projects, chuyển đến trang hiển thị danh sách nhiệm vụ của dự án đó.
  - Hiển thị thông tin tasks dạng bảng bao gồm: tên, mô tả, trạng thái, nút bấm `xoá`, `sửa`.
- **POST**: Thêm nhiệm vụ mới qua form, mỗi nhiệm vụ cần thuộc về 1 projects cụ thể thông qua `projectId`.
- **PUT**: Cập nhật thông tin nhiệm vụ.
- **DELETE**: Xóa nhiệm vụ (thêm xác nhận trước khi xóa).

- Các tính năng sau khi thực hiện thành công đều quay trở về trang danh sách nhiệm vụ của dự án đó.

- **Validation**:
  - `title`: bắt buộc, tối thiểu 3 ký tự.
  - `projectId`: bắt buộc, phải là ID của một project tồn tại.
  - `description`: Không bắt buộc.
  - `status`: bắt buộc, mang giá trị `not-started`, `in-progress`, `completed`.

---

## 5. Các tính năng nâng cao (2 điểm)

- Lọc `projects` theo trạng thái (not-started, in-progress, completed, huỷ lọc) (1 điểm).
- Tìm kiếm `projects` theo tên (1 điểm).

---

## Quy ước tính điểm

- **Routing và giao diện**: 1 điểm
- **Auth**: 3 điểm.
- **Quản lý dự án**: 2 điểm
- **Quản lý nhiệm vụ**: 2 điểm
- **Tính năng nâng cao**: 2 điểm

---Hết---

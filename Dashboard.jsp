<%@ page import="javax.servlet.http.HttpSession" %>
<%
    HttpSession session = request.getSession();
    String user = (String) session.getAttribute("user");
    String role = (String) session.getAttribute("role");
%>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h2>Welcome, <%= user %>!</h2>
    <h3>Role: <%= role %></h3>
    
    <h4>Your Bank Account</h4>
    <!-- Display account details here -->
    <form action="viewAccount" method="POST">
        <button type="submit">View Account</button>
    </form>

    <% if ("admin".equals(role)) { %>
        <h4>Admin Dashboard</h4>
        <form action="adminDashboard" method="POST">
            <button type="submit">Go to Admin Dashboard</button>
        </form>
    <% } %>
</body>
</html>

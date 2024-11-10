import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

public class ViewAccountServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String user = (String) session.getAttribute("user");

        try (Connection conn = DatabaseConnection.getConnection()) {
            String query = "SELECT * FROM accounts WHERE user_id = (SELECT id FROM users WHERE email = ?)";
            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setString(1, user);
                
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    response.getWriter().println("Account Balance: $" + rs.getDouble("balance"));
                } else {
                    response.getWriter().println("No account found.");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().println("Error retrieving account details.");
        }
    }
}

package com.sheltonbai.p2API;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class P2ApiApplication {

	public static void main(String[] args) {
		String url = "jdbc:mysql://localhost:3320/alldata";
        String user = "root";
        String password = "porygon2";
        
        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            if (connection != null) {
                System.out.println("Connection successful!");
            } else {
                System.out.println("Failed to make connection!");
            }
        } catch (SQLException e) {
            System.out.println("Connection failed!");
            e.printStackTrace();
        }

		SpringApplication.run(P2ApiApplication.class, args);
	}

}

package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  public static final String SQL_INSERT_ORDER = """
      insert into purchase_order(orderId, name, address, priority, comments)
      values (?, ?, ?, ?, ?)
      """;

  public static final String SQL_INSERT_LINE_ITEM = """
    INSERT INTO line_item (orderId, productId, name, quantity, price) 
    VALUES (?, ?, ?, ?, ?)
      """;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3
    template.update(SQL_INSERT_ORDER, order.getOrderId(), order.getName(), order.getAddress(),
        order.isPriority(), order.getComments());
    
    for(LineItem i: order.getCart().getLineItems()){
      template.update(SQL_INSERT_LINE_ITEM, order.getOrderId(), i.getProductId(), i.getName(), i.getQuantity(), i.getPrice());
    };
  
  }
}

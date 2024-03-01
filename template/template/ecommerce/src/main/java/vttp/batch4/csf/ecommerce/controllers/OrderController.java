package vttp.batch4.csf.ecommerce.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping("/api")
@ResponseBody
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping("/order")
  public ResponseEntity<String> postOrder(@RequestBody Order o) {
    System.out.println(o.getName());
    // TODO Task 3
    poSvc.createNewPurchaseOrder(o);
    System.out.println(">>creating sql row");
    String jsonResponse = "{\"orderId\": \"" + o.getOrderId() + "\"}";
	  return ResponseEntity.ok(jsonResponse);
  }

}

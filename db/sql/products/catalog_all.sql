select p.*, itp.image_url from product p
left join
image_to_product itp
on itp.product_id = p.id
where product_group_id = 9 and show_to_public = true
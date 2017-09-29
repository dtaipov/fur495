select
    fo.document_id,
    to_char(d.creation, 'YYYY-MM-DD') creation,
    fo.money_amount,
    fo.product_id,
    fo.quantity,
    p.name,
    p.service,
    p.price,
    p.product_group_id,
    itp.image_url,
    pg.name group_name
 from
 finance_operation fo, document d, product_group pg, product p
 left join
 image_to_product itp
 on itp.product_id = p.id
where
 fo.document_id = d.id and
 fo.product_id = p.id and
 p.show_to_public = true and
 pg.id = p.product_group_id and
 d.active = TRUE and
 d.document_type_id = 4
order by d.id desc
limit 20